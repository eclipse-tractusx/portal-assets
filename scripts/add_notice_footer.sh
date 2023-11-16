
print-usage() {
  cat << EOF
#
# Add license notice to all md files 
#
# usage:
#       source ./scripts/add_notice_footer.sh
#       cd path/to/your/documentation
#       add-notice
#
EOF
}

add-notice() {
    notice_text='''## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2021-2023 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam'''

    # Find all .md files in the directory and its subdirectories, excluding directories from the search
    find . -type f -name "*.md" -print0 | while IFS= read -r -d '' file; do
        last_line=$(tail -n 7 "$file")

        # Check if the last line of the file matches the notice text
        if [ "$last_line" != "$notice_text" ]; then
            # Append the notice text if it's not already there
            echo -e "\n$notice_text" >> "$file"
            echo "Notice added to $file"
        fi
    done
}

print-usage