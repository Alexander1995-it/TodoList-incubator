import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, TasksStateType} from "./tasksReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsApi";

let startState: TasksStateType

const todolistID1 = v1()
const todolistID2 = v1()


beforeEach(() => {
    startState = {
        [todolistID1]: [
            {
                description: 'string',
                title: 'task1',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'task2',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            }
        ],
        [todolistID2]: [
            {
                description: 'string',
                title: 'task1',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '1',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'task2',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            },
            {
                description: 'string',
                title: 'task3',
                status: 0,
                priority: 1,
                startDate: 'string',
                deadline: 'string',
                id: '2',
                todoListId: 'string',
                order: 1,
                addedDate: 'string'
            }
        ]
    }
})


test('correct task should be removed', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistID2, '1'))

    expect(endState[todolistID2].length).toBe(2)
    expect(endState[todolistID2][0].title).toBe('task2')
    expect(endState[todolistID2].every(t => t.id !== '1')).toBeTruthy()

})

test('correct title of task should be changed', () => {

    const model = {
        title: 'newTitle',
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: ''
    }

    const endState = tasksReducer(startState, changeStatusAC(todolistID2, '1', model))

    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2][0].title).toBe('newTitle')
    expect(endState[todolistID2][1].title).toBe('task2')


})

test('correct task should be added', () => {

    const newTask = {
        description: '',
        title: 'learn JS',
        status: TaskStatuses.New,
        priority: 1,
        startDate: '',
        deadline: '',
        id: '4',
        todoListId: todolistID2,
        order: 1,
        addedDate: ''
    }

    const endState = tasksReducer(startState, addTaskAC(todolistID2, newTask))

    expect(endState[todolistID1].length).toBe(2)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID2][0].title).toBe('learn JS')
    expect(endState[todolistID2][1].title).toBe('task1')
})

test('correct status of task should be changed', () => {

    const model = {
        title: 'task2',
        description: '',
        status: TaskStatuses.Completed,
        priority: 1,
        startDate: '',
        deadline: ''
    }

    const endState = tasksReducer(startState, changeStatusAC(todolistID2, '2', model))

    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2][1].status).toBe(2)
    expect(endState[todolistID2][0].status).toBe(0)

})


