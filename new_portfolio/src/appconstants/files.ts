import { File } from "store/fileSystemSlice";

export const files: File[] = [
  {
    name: "test.txt",
    language: "python",
    content: "This is a test file!! \n",
  },
  {
    name: "intro",
    language: "text",
    content: `Here a quick summary to using vim:

1. The cursor is moved using either the arrow keys or the hjkl keys.
        h (left)       j (down)       k (up)       l (right)

2. To exit Vim type:     <ESC>   :q   <ENTER>.

3. To delete the character at the cursor type:  x

4. To insert or append text type:
        i   type inserted text   <ESC>         insert before the cursor
        A   type appended text   <ESC>         append after the line

NOTE: Pressing <ESC> will place you in Normal mode or will cancel
      an unwanted and partially completed command.

    `,
  },
];
