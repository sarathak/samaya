import { expect } from 'chai';
import mutations from '@/store/mutations';
const { updateTime, startTimer, stopTimer, updateMode, addTask, removeTask, moveTasks } = mutations;
describe("Timer", () => {
    it('updateTime', () => {
        const state = { timer: 0 };
        updateTime(state, 10);
        expect(state.timer).to.equal(10);

    })
    it('Start stop', () => {
        const state = { timer_running: false };
        startTimer(state);
        expect(state.timer_running).to.true;
        stopTimer(state);
        expect(state.timer_running).to.false;

    });
    it('Mode change', () => {
        const state = { timer_mode: 'timer', timer: 0 };
        updateMode(state, 'timer');
        expect(state.timer).to.equal(1500);
        expect(state.timer_mode).to.equal('timer');

        updateMode(state, 'brake_short');
        expect(state.timer).to.equal(300);
        expect(state.timer_mode).to.equal('brake_short');
        updateMode(state, 'brake_long');
        expect(state.timer).to.equal(900);
        expect(state.timer_mode).to.equal('brake_long');

    });
})
describe("Task", () => {
    it('add/edit task', () => {
        const state = { tasks: [] };
        addTask(state, { title: 'title' });
        expect(state.tasks[0].title).to.equal('title');
        addTask(state, { title: 'title2', parent_id: 1 });
        expect(state.tasks[1].title).to.equal('title2');
        expect(state.tasks[1].id).to.equal(2);
        expect(state.tasks[1].parent_id).to.equal(1);

        // edit task
        addTask(state, { title: 'title3', id: 2 });
        expect(state.tasks[1].title).to.equal('title3');

    });

    it('remove task', () => {
        const state = {
            tasks: [
                { id: 1, title: 'title' },
                { id: 2, title: 'title2' },
                { id: 3, title: 'title3' },
                { id: 4, title: 'title4' },
                { id: 5, title: 'title5', parent_id: 4 },
                { id: 6, title: 'title6' },
            ]
        };
        removeTask(state, 2);
        expect(state.tasks[0].title).to.equal('title');
        expect(state.tasks[4].title).to.equal('title6');
        expect(state.tasks.length).to.equal(5);

        removeTask(state, 4);
        expect(state.tasks[0].title).to.equal('title');
        expect(state.tasks.length).to.equal(5);

    });
    it('move task', () => {
        const state = {
            tasks: [
                { id: 1, title: 'title1', parent_id: null, children: [] },
                { id: 2, title: 'title2', parent_id: null, children: [] },
                { id: 3, title: 'title3', parent_id: null, children: [] },
                { id: 4, title: 'title4', parent_id: null, children: [] },
                { id: 5, title: 'title5', parent_id: 4 },
                { id: 6, title: 'title6', parent_id: null, children: [] },
            ]
        };
        moveTasks(state, [
            { id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 2, title: 'title2', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: null, children: [] },
            { id: 5, title: 'title5', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },
        ]);
        expect(state.tasks).to.deep.equal([
            { id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 2, title: 'title2', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: null, children: [] },
            { id: 5, title: 'title5', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },
        ]);
        moveTasks(state, [
            { id: 1, title: 'title1', parent_id: null, children: [] },
            {
                id: 3, title: 'title3', parent_id: null, children: [
                    { id: 4, title: 'title4', parent_id: null, children: [] },
                    { id: 5, title: 'title5', parent_id: null, children: [] },
                ]
            },
            {
                id: 6, title: 'title6', parent_id: null, children: [
                    { id: 2, title: 'title2', parent_id: null, children: [] },
                ]
            },
        ]);
        expect(state.tasks).to.deep.equal([
            { id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: 3, children: [] },
            { id: 5, title: 'title5', parent_id: 3, children: [] },
            { id: 2, title: 'title2', parent_id: 6, children: [] },

        ]);

    });
})