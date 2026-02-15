const base_url = 'https://testing.miranapp.com/api'

 const post = async ({ target, body  }) => {
    const token = localStorage.getItem('miran-token')
    try {
        const url = `${base_url}/${target}`;
        const result = await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `token ${token}` : null,
                'App-Version' : '2.1.6'

            },
            body: JSON.stringify(body)
        })
        return await result.json()

    } catch (error) {
        console.log('error', error)
    }

}

const get = async ({target}) => {
    const token = localStorage.getItem('miran-token')
    const url = `${base_url}/${target}`
    try {
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `token ${token}` : null,
            },
        })


        return await result.json()
    } catch (error) {
        console.warn('error', error)
    }
}


const put = async({ target, body }) => {
    try {
        const url = `${base_url}/${target}`;
        const token = localStorage.getItem('miran-token')
        const result = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `token ${token}` : null,
            },
            body: JSON.stringify(body)
        })
        return await result.json()

    } catch (error) {
        console.log('error', error)
    }
}

const  _delete = async ({ target,body }) => {
    try {
        const url = `${base_url}/${target}`;
        const token = localStorage.getItem('miran-token')
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? `token ${token}` : null,
                'App-Version' : '2.1.6',
            },
            body: JSON.stringify(body)
        })
        return await result.json()
    } catch (error) {
        console.log('error', error)
    }
}



const Post_As_Form_Data = async({target , body}) => {
    const url = `${base_url}/${target}`;
    const token = localStorage.getItem('miran-token');
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'App-Version' : '2.1.6',
                'Authorization': token ? `token ${token}` : null,
            },
            body
        })
        return await result.json()
    }catch (error) {
        console.log(error)
    }
}


export  const HTTP_REQUEST = {
    post,
    get,
    put,
    _delete,
    Post_As_Form_Data
}