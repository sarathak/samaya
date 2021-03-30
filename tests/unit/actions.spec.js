import { expect } from 'chai';
// import {jest} from 'jest';
import sinon from 'sinon';
import actions from '@/store/actions';
jest.mock('@/libs/audio', () => ({
    playTimerComplete: jest.fn()
  }));
const { startTimer, stopTimer, updateMode, updateTime } = actions;
describe("Actions", () => {
    it('start timer', () => {
        const commit = sinon.spy();
        startTimer({ commit, },)
        expect(commit.args).to.deep.equal([['startTimer']]);
    })
    it('stop timer', () => {
        const commit = sinon.spy();
        stopTimer({ commit, },)
        expect(commit.args).to.deep.equal([['stopTimer']]);
    });
    it('update mode', () => {
        const commit = sinon.spy();
        const dispatch = sinon.spy();
        updateMode({ commit, dispatch }, 'timer')
        expect(commit.args).to.deep.equal([['updateMode', 'timer']]);
        expect(dispatch.args).to.deep.equal([['stopTimer']]);
    });
    it('update time', () => {
       
        let commit = sinon.spy();
        let dispatch = sinon.spy();
        updateTime({ commit, dispatch, state: { timer: 2 } },)
        expect(commit.args).to.deep.equal([['updateTime', 1]]);
        commit = sinon.spy();
        updateTime({ commit, dispatch, state: { timer: 1 } })
        expect(commit.args).to.deep.equal([['updateTime', 0]]);    

        commit = sinon.spy();
        dispatch = sinon.spy();
        updateTime({ commit, dispatch, state: { timer: 0,pomodoros:0, timer_mode :'timer' } },)
        expect(commit.args).to.deep.equal([['pomodoroComplete']]);            
        expect(dispatch.args).to.deep.equal([['updateMode','brake_short']]);    
        
        commit = sinon.spy();
        dispatch = sinon.spy();
        updateTime({ commit, dispatch, state: { timer: 0,pomodoros:0, timer_mode :'brake_short' } },)          
        expect(dispatch.args).to.deep.equal([['updateMode','timer']]);    

        commit = sinon.spy();
        dispatch = sinon.spy();
        updateTime({ commit, dispatch, state: { timer: 0,pomodoros:3, timer_mode :'timer' } },)
        expect(commit.args).to.deep.equal([['pomodoroComplete']]);            
        expect(dispatch.args).to.deep.equal([['updateMode','brake_long']]);            
    });

});

// import { shallowMount } from '@vue/test-utils'
// import Folder from '@/views/Folder.vue'

// describe('Folder.vue', () => {
//   it('renders folder view', () => {
//     const mockRoute = {
//       params: {
//         id: 'Outbox'
//       }
//     }
//     const wrapper = shallowMount(Folder, {
//       global: {
//         mocks: {
//           $route: mockRoute
//         }
//       }
//     })
//     expect(wrapper.text()).toMatch('')
//   })
// })
