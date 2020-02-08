import {createStore} from 'redux';

const divToggle = document.getElementsByClassName('toggle')[0];
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 액션 타입과 액션 생성 함수 정의 
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 이름을 사용하여 액션 객체를 만드는 액션 함수 작성
// 액션 객체는 type 값을 반드시 갖고 있어야 하며, 그 외 추후 상태를 업데이트할 때 참고하싶은 값을 정한다.
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const increase = difference => ({type: INCREASE, difference});
const decrease = () => ({type: DECREASE});

//초기값 설정
const initialState = {
    toggle : false,
    counter : 0
}

// state가 undefined일 때는 initialState를 기본값으로 사용
// reducer 함수가 맨 처음 호출될 때는 state 값이 undefined이다.
// initialState를 기본값으로 설정하기 위해 함수의 파라미터 쪽에 기본값이 설정해두었다.
function reducer(state = initialState, action){   
    //action.type에 따라 다른 작업을 처리함
  switch (action.type){
      case TOGGLE_SWITCH:
          return{
              ...state,    //불변성을 유지해 줘야한다???
              toggle: !state.toggle
          };
      case INCREASE:
          return{
              ...state,
              counter:state.counter + action.difference
          };
      case DECREASE:
          return{
              ...state,
              counter: state.counter - 1
          };
       default:
           return state;
  }
}

const store = createStore(reducer);
//이 함수를 사용하기 위해서는 상단에 import를 해주어야 한다.
//그리고 이 함수안에 파라미터로 리듀서를 넣어주어야 한다.


//다시 그려주는 부분
const render = () =>{
    const state = store.getState(); //현재 상태를 불러온다.
    //토글 처리
    if(state.toggle){
        divToggle.classList.add('active');
        divToggle.innerText="One more"
    }else{
        divToggle.classList.remove('active');
        divToggle.innerText="Click me"
    }
    //카운터 처리
    counter.innerText = state.counter;
}

//react-redux 사용시에는 라이브러리에서 대신 사용해주기에 생략해준다.
render();
store.subscribe(render);


//액션 발생시키기
divToggle.onclick = () =>{
   store.dispatch(toggleSwitch());
};
btnIncrease.onclick=()=>{
    store.dispatch(increase(1));
}
btnDecrease.onclick=()=>{
    store.dispatch(decrease());
}



