const CART_ADD = 'CART_ADD'
const RESET_BALL = 'RESET_BALL'
export default {
    [ CART_ADD ] ( state, el ) {
        console.log('mutation:',el)
        for(let i = 0; i < state.balls.length; i++){
            if(!state.balls[i].show){
                state.balls[i].show = true
                state.balls[i].el = el
                state.dropBalls.push(state.balls[i])
                console.log(' state.dropBalls:', state.dropBalls)
                return;
            }
        }
    },
    [ RESET_BALL ](state, el) {
        let ball = state.dropBalls.shift()
        if(ball){
            ball.show = false
            el.style.display = 'none'
        }
    }
}