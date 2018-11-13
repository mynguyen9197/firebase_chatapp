import React from 'react'
import { FaFile, FaFileImage } from 'react-icons/fa'

export default class MessageInput extends React.Component{
	render(){
		return (
			<div className="chat-message clearfix">
		        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
		                
		        <button className="fa-file-o"><FaFile /></button> &nbsp;&nbsp;&nbsp;
		        <button className="fa-file-image-o"><FaFileImage /></button>
		        
		        <button>Send</button>

		    </div>
		)
	}
}