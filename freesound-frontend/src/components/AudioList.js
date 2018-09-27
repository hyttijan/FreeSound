import React from 'react'
import {Table} from 'semantic-ui-react'
import ReactAudioPlayer from 'react-audio-player'
import {Link} from 'react-router-dom'
class AudioList extends React.Component{
		constructor(props){
			super(props)
			this.state = {isVisible:false}
		}
		toggleVisibility = ()=>{
			this.setState({isVisible:!this.state.isVisible})
		}
		render(){
			const audioHeader = <Table.Row key={`collection ${this.props.collection.id}`}>
      								<Table.Cell><h4>Audio name</h4></Table.Cell>
      								<Table.Cell>Audio description</Table.Cell>
      								<Table.Cell textAlign="right">Play audio</Table.Cell>
    							</Table.Row>
			const audios = this.props.collection.audio_set.map((audio)=>{
					return(
    					<Table.Row key={audio.id}>
      						<Table.Cell>{audio.name}</Table.Cell>
      						<Table.Cell>{audio.description}</Table.Cell>
      						<Table.Cell textAlign="right">
      							<ReactAudioPlayer src={audio.audio_file}
        										  controls
        										  crossorigin="anonymous"
        						/>
        					</Table.Cell>
    					</Table.Row>
    				)
    				})
			return (
				<Table.Body>
					<Table.Row onClick={this.toggleVisibility}>
      					<Table.Cell><h4>{this.props.collection.name}</h4></Table.Cell>
      					<Table.Cell>{this.props.collection.creator&&<Link to={`/user/${this.props.collection.creator.id}`}>{this.props.collection.creator.username}</Link>}</Table.Cell>
      					<Table.Cell textAlign="right">{this.props.collection.audio_set.length}</Table.Cell>
    				</Table.Row>
    				
    				{this.state.isVisible&&[audioHeader,...audios]}
				</Table.Body>
			)
		}

}

export default AudioList