#include <stdio.h>
#include<stdlib.h>

void quicksort(int v[], int left, int right) {
  int i, last;
  void swap(int v[], int i, int j);
  if (left >= right) {
    return;
  }
  swap(v, left, (left + right) / 2);
  last = left;
  for(i = left + 1; i <= right; i++) {
    if (v[i] < v[left]) {
      swap(v, ++last, i);
    }
  }
  swap(v, left, last);
  quicksort(v, left, last - 1);
  quicksort(v, last + 1, right);
}

void swap(int v[], int i, int j) {
  int temp;
  temp = v[i];
  v[i] = v[j];
  v[j] = temp;
}

int main() {
  int arr[] = { 1, 3, 5, 1, 43, 3232, 54, 755, 67, 7254, 423, 98, 437, 345 };
  quicksort(arr, 0, 13);
  int length = sizeof(arr)/sizeof(int); //length of an integer array
  int i;
  for(i = 0; i < length; i++) {
    printf("%d \n", arr[i]);
  }
  return 0;
}
