#!/usr/bin/env python3

import os
import sys
import secrets
import string
import stat

OUTPUT_FILE = ".env"
USERNAME = "root"
DATABASE = "gui"
PASSWORD_LENGTH = 32

def check_root():
    if os.geteuid() != 0:
        print("Please run as root to secure the output file properly.")
        sys.exit(1)

def generate_password(length):
    chars = string.ascii_letters + string.digits + "._-"
    return ''.join(secrets.choice(chars) for _ in range(length))

def write_env_file(username, database, password):
    with open(OUTPUT_FILE, "w") as f:
        f.write(f"MONGO_INITDB_ROOT_USERNAME={username}\n")
        f.write(f"MONGO_INITDB_DATABASE={database}\n")
        f.write(f"MONGO_INITDB_ROOT_PASSWORD={password}\n")

def secure_file(path):
    os.chown(path, 0, 0)  # root:root
    os.chmod(path, stat.S_IRUSR | stat.S_IWUSR)  # 0o600

def main():
    check_root()
    password = generate_password(PASSWORD_LENGTH)
    write_env_file(USERNAME, DATABASE, password)
    secure_file(OUTPUT_FILE)
    print(f"Credentials written securely to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()

