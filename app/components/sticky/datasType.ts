function generateStickyData({ id, title, body, created, updated, color, pinned, importance }: stickyDataType) {
    return ({
        id, title, body, created, updated, color, pinned, importance
    })
}

const normalStickyData = generateStickyData({
    id: '1', title: null, body: 'Today, I have to do this.', created: new Date(),
    updated: new Date("2023-05-30T14:07:06.045Z"), color: '#FFFFFF', pinned: false, importance: 0,
})

const allFilledStickyData = generateStickyData({
    id: '2', title: 'Ironing', body: 'Today, I have to Iron my clothes', created: new Date(),
    updated: new Date("2023-05-30T14:07:06.045Z"), color: '#FFFFFF', pinned: true, importance: 5
})

const lowImportanceUnpinnedStickyData = generateStickyData({
    id: '3', title: 'Walking dog', body: 'Today, I have to Walking dog', created: new Date(),
    updated: new Date("2023-05-30T14:07:06.045Z"), color: '#FFFFFF', pinned: false, importance: 1
})

const lowImportancePinnedStickyData = generateStickyData({
    id: '4', title: 'Wash clothes', body: 'Today, I have to Wash clothes', created: new Date(),
    updated: new Date("2023-05-30T14:07:06.045Z"), color: '#FFFFFF', pinned: true, importance: 1
})

const allDatas = [normalStickyData, allFilledStickyData, lowImportanceUnpinnedStickyData, lowImportancePinnedStickyData];

export { allDatas };

/*
IDEA: Sort by default -> from array
Sort from importance -> pinned then importance
*/