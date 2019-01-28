// cat getline | ./a.out
#include <stdio.h>
#define MAXLINE 100

int getLine(char line[], int max);
int stringIndex(char src[], char searchfor[]);

char pattern[] = "fxxk";

int main() {
  char line[MAXLINE];
  int found = 0;

  while (getLine(line, MAXLINE) > 0) {
    int postion = stringIndex(line, pattern);
    if (postion >= 0) {
      printf("\n %s at %d \n", line, postion);
      found ++;
    }
  };

  return found;
}

int getLine(char s[], int lim) {
  int c, i;
  i = 0;
  while (--lim > 0 && (c=getchar()) != EOF && c != '\n' ) {
    s[i++] = c;
  };
  if (c == '\n') {
    s[i++] = c;
  };
  s[i] = '\0';
  return i;
}

int stringIndex(char s[], char t[]) {
  int i, j, k;

  for (i = 0; s[i] != '\0'; i++) {
    for (j = i, k = 0; t[k] != '\0' && s[j] == t[k]; j++, k++) {
    };
    if (k > 0 && t[k] == '\0') {
      return i;
    };
  };
  return -1;
}
