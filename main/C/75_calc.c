#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

#define MAX 100
#define NUMBER '0'

int sp = 0;
double val[MAX];
char buf[MAX];
int bufp = 0;

int getop(char []);
void push(double);
double pop(void);
int getch(void);
void ungetch(int);

int main() {
  int type;
  double op2;
  char s[MAX];

  while((type = getop(s)) != EOF){
    switch (type) {
      case NUMBER:
        push(atof(s));
        break;
      case '+':
        push(pop() + pop());
        break;
      case '*':
        push(pop() * pop());
        break;
      case '-':
        op2 = pop();
        push(pop() - op2);
        break;
      case '/':
        op2 = pop();
        if (op2 != 0.0) {
          push(pop() / op2);
        } else {
          printf("error: not zero\n");
        }
        break;
      case '\n':
        printf("\t%.8g\n", pop());
        break;
      default:
        printf("unknown\n");
        break;
    }
  }
  return 0;
}

void push(double f) {
  if (sp < MAX) {
    val[sp ++] = f;
  } else {
    printf("stack full\n");
  }
}

double pop(void) {
  if (sp > 0) {
    return val[--sp];
  } else {
    printf("stack empty\n");
    return 0.0;
  }
}

int getop(char s[]) {
  int i, c;
  while((s[0] = c = getch()) == ' ' || c == '\t'){
  }
  s[1] = '\0';
  if (!isdigit(c) && c != '.') {
    return c;
  }
  i = 0;
  if (isdigit(c)) {
    while(isdigit(s[++ i] = c = getch())){
    }
  }
  if (c == '.') {
    while(isdigit(s[++ i] = c = getch())){
    }
  }
  s[i] = '\0';
  if (c != EOF) {
    ungetch(c);
  }
  return NUMBER;
}

int getch(void) {
  return (bufp > 0) ? buf[--bufp] : getchar();
}

void ungetch(int c) {
  if (bufp >= MAX) {
    printf("too many\n");
  } else {
    buf[bufp ++] = c;
  }
}
