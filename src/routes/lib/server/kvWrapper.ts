


export async function delete_entry(title: string, namespace: any){
    // await namespace.delete(title)

    const store = await namespace.get('entries', 'json')


    store.forEach((entry: any, index: number) => {
        if (entry.title === title){
            store.splice(index, 1)
        }
    })

    await namespace.put('entries', JSON.stringify(store))
}

export async function get_entries(namespace: any){
    // const result = await namespace.list()
    //
    // // @ts-ignore
    // return result.keys.map(({metadata}) => metadata)

    const store = await namespace.get('entries', 'json')
    return store
}

export async function update_entry(object: any, namespace: any){
    // const {title, img, status, phase} = object
    //
    // let options = {
    //     metadata: {
    //         img,
    //         status,
    //         title,
    //         phase,
    //         lastupdate: Date.now()
    //     },
    //     expirationTtl: status === 100 ? 60 * 60 * 24 * 2 : undefined
    // }
    //
    // await namespace.put(title, '', options)

    const store = await namespace.get('entries', 'json')

    let found = false

    store.forEach((entry: any) => {
        if (entry.title === object.title){
            found = true
            entry.img = object.img
            entry.status = object.status
            entry.phase = object.phase
            entry.lastupdate = Date.now()
        }
    })

    if (!found){
        store.push({
            img: object.img,
            status: object.status,
            title: object.title,
            phase: object.phase,
            lastupdate: Date.now()
        })
    }

    await namespace.put('entries', JSON.stringify(store))
}