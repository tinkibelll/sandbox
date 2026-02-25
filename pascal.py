def pascal(values, k, max_k):
    if k == max_k:
        return

    print(f"Row {k}: {values}")

    next_row = [1]
    for i in range(len(values) - 1):
        next_row.append(values[i] + values[i + 1])
    next_row.append(1)

    pascal(next_row, k + 1, max_k)

pascal([1], 0, 8)




