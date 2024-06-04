import streamlit as st

def find_largest_square():
    N = st.text_input("Enter N:")
    output = ''
    if N:
        try:
            N = int(N)
            M = int(N ** 0.5)
            ANS = M * M
            output = f"INPUT: {N}\nOUTPUT: {ANS}"
        except ValueError:
            output = 'Please enter a valid number.'
    return output

st.title('abc077b')
st.write("""
    N以下の平方数のうち、最大のものを求めてください。ただし、平方数とは、ある整数の2乗として表せる整数のことを指します。
""")
output = find_largest_square()
st.write(output)
