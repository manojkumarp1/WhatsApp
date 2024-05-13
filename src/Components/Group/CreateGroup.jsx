import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import SelectedMember from './SelectedMember';
import ChatCard from '../CharCard/ChatCard';
import NewGroup from './NewGroup';
import { searchUser } from '../../Redux/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';

function CreateGroup({setIsGroup,handleCreateGroupFalse}) {
    const [newGroup, setNewGroup] = useState(false);
    const [groupMember,setGroupMember]=useState(new Set())
    const [query,setQuery]=useState("")
    const {auth}=useSelector(store=>store)
    const dispatch = useDispatch();

    const token=localStorage.getItem("token")
    const handleRemoveMember=(item)=>
    {
        console.log(item)
        const updateMembers = new Set(groupMember);
        updateMembers.delete(item)
        setGroupMember(updateMembers)
    }
    const handleSearch=(keyword)=>
    {
        dispatch(searchUser({keyword,token}))
    }
    const handleNewGroup=()=>{
        setNewGroup(false)  ;
    }

    return (
        <div className="w-full h-full ">
            {!newGroup && (
                <div>
                    <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                        <BsArrowLeft onClick={handleCreateGroupFalse} className="cursor-pointer text-2xl font-bold" />
                        <p className="text-xl font-semibold">Add Group Participants</p>
                    </div>
                    <div className="relative bg-white py-4 px-3">
                        <div className="flex space-x-2 flex-wrap space-y-1">
                        {groupMember.size > 0 && Array.from(groupMember).map(item => (
    <SelectedMember handleRemoveMember={() => handleRemoveMember(item)} member={item} />
))}


                        </div>
                         
                    </div>
                    <div>
                        <input type="text" onChange={(e)=>
                            {handleSearch(e.target.value)
                            setQuery(e.target.value)}} 
                            className="outline-none border-b border-[#88888] p-2 w-[93%]"
                            placeholder="Search user"
                            value={query}
                            
                            />
                    </div>
                    <div className="bg-white overflow-y-scroll h-[50.2vh]">
                        {query && auth.searchuser?.map((item)=><div onClick={()=>
                        {
                            groupMember.add(item)
                            console.log(groupMember)
                            setGroupMember(groupMember)
                            setQuery("")
                        }}
                        key={item?.id}>
                            <hr />
                            <ChatCard userImg={item.profilePicture} name={item.fullName}/>
                            </div>
                        )}
                        
                    </div>
                    <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center'>
                        <div className="bg-green-600 rounded-full p-4 cursor-pointer" onClick={()=>
                        {
                            setNewGroup(true)
                        }}>
                            <BsArrowRight className="text-white font-bold text-3xl" />
                        </div>
                        
                    </div>
            </div>
            )}
            {newGroup && <NewGroup groupMember={groupMember} setIsGroup={setIsGroup} handleNewGroup={handleNewGroup}/>}

            
        </div>
    );
}

export default CreateGroup;
