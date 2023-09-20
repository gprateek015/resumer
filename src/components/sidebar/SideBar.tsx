import React from 'react'
import Image from 'next/image';
import "./sidebar.scss"
import { Button } from '@mui/material'
import newIcon from "@/assets/icons/new.svg"


const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='upperSection'>
                <Button variant='contained' className='bt'> <Image className='icon' src={newIcon} alt="" /> New Resume</Button>
            </div>
            <div className='line'></div>
        </div>
    )
}

export default SideBar