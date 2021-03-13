import { expect } from 'chai';
import getters from '@/store/getters';
const { task_tree } = getters;
describe("Getter", () => {
    it('test tree', () => {
        const state = {
            tasks: [{ id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 2, title: 'title2', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: null, children: [] },
            { id: 5, title: 'title5', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },]
        };
        let result = task_tree(state);
        expect(result).to.deep.equal([
            { id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 2, title: 'title2', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: null, children: [] },
            { id: 5, title: 'title5', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },
        ]);
        state.tasks = [
            { id: 1, title: 'title1', parent_id: null, children: [] },
            { id: 3, title: 'title3', parent_id: null, children: [] },
            { id: 6, title: 'title6', parent_id: null, children: [] },
            { id: 4, title: 'title4', parent_id: 3, children: [] },
            { id: 5, title: 'title5', parent_id: 3, children: [] },
            { id: 2, title: 'title2', parent_id: 6, children: [] },
        ]
        result = task_tree(state);
        expect(result).to.deep.equal([
            { id: 1, title: 'title1', parent_id: null, children: [] },
            {
                id: 3, title: 'title3', parent_id: null, children: [
                    { id: 4, title: 'title4', parent_id: 3, children: [] },
                    { id: 5, title: 'title5', parent_id: 3, children: [] },
                ]
            },
            {
                id: 6, title: 'title6', parent_id: null, children: [
                    { id: 2, title: 'title2', parent_id: 6, children: [] },
                ]
            },
        ]);

        

    })
});