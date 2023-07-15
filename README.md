# lv5project

![image](https://github.com/eshika90/lv4project/assets/129057141/3220eec7-326f-4f16-9e06-3b71719ad568)
!!Question!!

1. 이전에 폴더명을 대문자 or 소문자 한 가지로 통일하라고 하셔서 앞 글자만
   대문자로 설정했는데 종종 require로 불러올때마다 인식을 하지못합니다.
   대문자는 지양하거나 프로그램에서 잘 읽히지 않는걸까요?

2. usersRepository에서 updateToken을 하는 과정에서 update함수를 사용하였습니다. 그렇다면 route파일에서는 put을 쓰는게 맞는걸까요 post를 쓰는게 맞는걸까요? 어떤것이 맞다면 왜 그런가요?

3. lv4를 router / middleware / controller로 나누어서 하였습니다.
   그런데 이번 3Layered Architecture에서는 더 쪼개서 관리해야 하는
   폴더 두 개가 생겼습니다. 저는 lv5과제를 하면서 이번 주제로는 3LA가
   부적합한것이 아닌가 생각했습니다. 예를들어 게시글의 댓글을 삭제하는
   API는 실제로 service에서는 repository에 매개변수를 전달하는 역할밖에 수행하지 못하였습니다. 그래도 전체적으로 봤을때는 RESTful API의 의미에서 일관성을 유지하기때문에 좋은 형식인가요?
