import { File } from "store/fileSystemSlice";

export const files: File[] = [
  {
    name: "test.txt",
    language: "plain_text",
    content: "This is a test file!! \n",
  },
  {
    name: "intro",
    language: "plain_text",
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
  {
    name: "isqrt",
    language: "c_cpp",
    content: `float Q_rsqrt(float number){
  long i;
  float x2, y;
  const float threehalfs = 1.5F;

  x2 = number * 0.5F;
  y  = number;
  i  = * ( long * ) &y;                       // evil floating point bit level hacking
  i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
  y  = * ( float * ) &i;
  y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

  return y;
}
    `,
  },
];
