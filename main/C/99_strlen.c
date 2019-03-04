#include <stdio.h>

int strLen(char *s) {
  int n;
  for( n = 0; *s != '\0'; n ++) {
    s ++;
  }
  return n;
}

int main() {
  printf("%d\n", strLen("strstrstr"));
  return 0;
}
