import streamlit as st
import time

def lucas_number(n):
    if n == 0:
        return 2
    elif n == 1:
        return 1
    else:
        return lucas_number(n - 1) + lucas_number(n - 2)

def main():
    st.title("ABC079B Lucas数 python")
    n = st.number_input("Nを入力してください", min_value=1)

    if st.button("計算実行"):
        start_time = time.time()
        result = lucas_number(n)
        process_time = time.time() - start_time
        st.write(f"Lucas数 L{n} = {result}")
        st.write(f"処理時間: {process_time:.3f}秒")

if __name__ == "__main__":
    main()
