import streamlit as st

st.title('abc053a')
st.write("""
    すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
""")
rate = st.slider(
        'select your rate', 
        value=400,
        min_value=0,
        max_value=3000,
        step=1
    )
if rate<1200:
    ans="ABC"
else:
    ans="ARC"

st.write('your rate: ',rate)
st.write('your contest: ',ans)
