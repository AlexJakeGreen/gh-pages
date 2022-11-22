---
layout: post
title:  "The question from a DevOps interview"
date:   2017-03-26
categories: interview
---

The question was to write a function, which returns Nth element from sequence `abacabadabacaba....`

I'm curious why they want devops engineer who knows fractals, but [here](http://www.abacaba.org/abacaba-article.pdf) is the link explaining everything about this sequence.

Well, the alghorithm is straighforward enough, imagine N as a binary where each digit represents a character, we will read them starting from right to left. The first digit is `b`, second - `c` and so on. `a` is a letter by default.

```
jhgfedcba
00000000 a
00000001 b
00000010 a
00000011 c
00000100 a
00000101 b
00000110 a
00000111 d
00001000 a
00001001 b
00001010 a
00001011 c
00001100 a
00001101 b
00001110 a
00001111 e
```

We remember that we started with `a` letter and continue moving from left until we reach 0 digit. If current digit is 1 then we replace the char we remembered earlier according to chars in first line.

{% highlight c %}
#include <stdio.h>

#define ABA_LENGTH 400

char aba(int n, char last) {
  if (0 == (n & 0b1) || 0 == n)
    return last;
  return aba(n >> 1, ++last);
}

int main(int argc, char **argv) {

  for (int i = 0; i < ABA_LENGTH; i++) {
    printf("%c", aba(i, 'a'));
  }

  return 0;
}
{% endhighlight %}

This way we get a first half of anagram solved. The other part should be easy.
