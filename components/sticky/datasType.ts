import { formatDateTime } from "@/utils/utils"

function generateStickyData({ id, title, body, created, updated, color, pinned, importance, sequence, done, deadline }: stickyDataType) {
    return ({
        id, title, body, created, updated, color, pinned, importance, sequence, done, deadline
    })
}

const normalStickyData = generateStickyData({
    id: '1', title: null, body: 'Today, I have to do this.', created: formatDateTime(new Date()), sequence: 1,
    updated: formatDateTime(new Date("2023-05-30T14:07:06.045Z")), color: null, pinned: false, importance: 0,
    done: false, deadline: 'never',
})

const allFilledStickyData = generateStickyData({
    id: '2', title: 'Ironing', body: 'Today, I have to Iron my clothes', created: formatDateTime(new Date()), sequence: 2,
    updated: formatDateTime(new Date("2023-05-30T14:07:06.045Z")), color: null, pinned: true, importance: 5,
    done: false, deadline: 'never',
})

const lowImportanceUnpinnedStickyData = generateStickyData({
    id: '3', title: 'Walking dog', body: 'Today, I have to Walking dog', created: formatDateTime(new Date()), sequence: 3,
    updated: formatDateTime(new Date("2023-05-30T14:07:06.045Z")), color: null, pinned: false, importance: 1,
    done: false, deadline: 'never',
})

const lowImportancePinnedStickyData = generateStickyData({
    id: '4', title: 'Wash clothes', body: 'Today, I have to Wash clothes', created: formatDateTime(new Date()), sequence: 4,
    updated: formatDateTime(new Date("2023-05-30T14:07:06.045Z")), color: null, pinned: true, importance: 1,
    done: false, deadline: 'never',
})

const allDatas = [normalStickyData, allFilledStickyData, lowImportanceUnpinnedStickyData, lowImportancePinnedStickyData];

export { allDatas };

/*
IDEA: Sort by default -> from array
Sort from importance -> pinned then importance
*/