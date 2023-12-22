

export const entries_manager = {
    delete_entry: async function (title: string, namespace: any) {
        const entries = await (await namespace.get('entries', {type: 'json'}) || [])


        entries.forEach((entry: any, index: number) => {
            if (entry.title === title) {
                entries.splice(index, 1)
            }
        })

        await namespace.put('entries', JSON.stringify(entries))
    },
    get_entries: async function (namespace: any) {
        return await namespace.get('entries', {type: 'json'}) || []
    },
    update_entry: async function (object: any, namespace: any) {
        const entries = await (await namespace.get('entries', {type: 'json'}) || [])

        let found = false

        entries.forEach((entry: any) => {
            if (entry.title === object.title) {
                found = true
                entry.img = object.img
                entry.status = object.status
                entry.phase = object.phase
                entry.lastupdate = Date.now()
            }
        })

        if (!found) {
            entries.push({
                img: object.img, status: object.status, title: object.title, phase: object.phase, lastupdate: Date.now()
            })
        }

        await namespace.put('entries', JSON.stringify(entries))
    }
}


