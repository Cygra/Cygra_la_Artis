#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define STEP  20

void calcTemp();

int main()
{
  calcTemp();

  int c, i, nwhite, nother;
  int ndigit[10];

  nwhite = nother = 0;

  for (i = 0; i < 10; ++i)
    ndigit[i] = 0;

  while ((c = getchar()) != EOF)
    if (c >= '0' && c <= '9')
      ++ndigit[c-'0'];
    else if (c == ' ' || c == '\n' || c == '\t')
      ++nwhite;
    else
      ++nother;

  printf("digits =");

  for (i = 0; i < 10; ++i)
    printf(" %d", ndigit[i]);
  printf(", white space = %d, other = %d \n", nwhite, nother);


  return 0;
}

void calcTemp() {
  float fahr, celsius;

  fahr = LOWER;

  while (fahr <= UPPER) {
    celsius = 5.0 * (fahr - 32.0) / 9.0;
    printf("%3.0f\t%6.2f\n", fahr, celsius);
    fahr += STEP;
  };

  for (fahr = 0; fahr <= 300; fahr += STEP) {
    printf("%3.0f\t%6.2f\n", fahr, 5.0 * (fahr - 32.0) / 9.0);
  }
}
