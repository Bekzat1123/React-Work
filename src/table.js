import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersFetchData } from './ActionUsers'


const URL = 'https://jsonplaceholder.typicode.com/users'

const Table = () => {
    const [checkedUsers, setChecked] = useState([])
    const { users } = useSelector(s => s.users)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(usersFetchData(URL))
    }, [dispatch])


    const checkHandler = (id) => {
        setChecked(checkedUsers.includes(id)
            ? checkedUsers.filter(user => user !== id)
            : [...checkedUsers, id])
    }
    console.log(checkedUsers);

    const checkAll = () => {
        setChecked(
            checkedUsers.length !== users.length
                ? users.map((user)=> user.id)
                :[]
        )
    }

    const headerElement = ['checked','id', 'name','username', 'email',]
    const renderHeader = () => {
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return users.map(({ id, name, email, username }) => {
            return (
                <tr key={id} className={checkedUsers.includes(id) ? 'bg-blue-500 opacity-80': ''}>
                    <td className='check-box'>
                        <input className="mr-2 leading-tight" type="checkbox" onChange={()=>checkHandler(id)} checked={checkedUsers.includes(id)} />
                    </td>
                    <td className="px-4 py-2" >{id}</td>
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{username}</td>
                    <td className="px-4 py-2">{email}</td>
                </tr>
            )
        })
    }
    return (

        <>
            <div className="rounded overflow-hidden  shadow-lg text-center mt-5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <h1 id='title' className="p-3 ">Users Table</h1>
                <div className="md:flex bg-gray-200 md:items-center mb-6">
                    <label className="md:w-2/3 block  font-bold p-1">
                        <input className="mr-2 leading-tight " type="checkbox" onChange={checkAll} checked={users.length === checkedUsers.length}/>
                        <span className="text-sm p-5">
              Checked All!
            </span>
                    </label>
                </div>
                <table id='users' className="table-auto text-center content-around">
                    <thead>
                    <tr>{renderHeader()}</tr>
                    </thead>

                    <tbody className="border-yellow-400">
                    {renderBody()}
                    </tbody>

                    <tfoot>
                    <tr>
                        <td colSpan={5}>
                  <textarea className="w-full " placeholder={
                      users.filter((el)=> checkedUsers.includes(el.id))
                          .map(e => e.name ).join("; ")
                  } />
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </>)


}

export default Table