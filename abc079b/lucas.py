# Lucas数を計算する関数 old type
def lucas(n):
    if n == 0:
        return 2
    if n == 1:
        return 1
    return lucas(n - 1) + lucas(n - 2)

# Lucas数を計算する関数 new type
def lucas2(n):
    if n == 0:
        return 2
    elif n == 1:
        return 1
    else:
        l0 = 2
        l1 = 1
        for _ in range(2, n + 1):
            l = l0 + l1
            l0 = l1
            l1 = l
        return l