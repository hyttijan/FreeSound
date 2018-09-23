import React from 'react'

import {Table} from 'semantic-ui-react'
class AudioList extends React.Component{
		constructor(props){
			super(props)
			this.state = {isVisible:false}
		}
		toggleVisibility = ()=>{
			this.setState({isVisible:!this.state.isVisible})
		}
		render(){

			const audios = this.props.collection.audio_set.map((audio)=>{
					return(
    					<Table.Row key={audio.id}>
      						<Table.Cell>{audio.name}</Table.Cell>
      						<Table.Cell textAlign="right"><i className="play icon"></i></Table.Cell>
    					</Table.Row>
    				)
    				})
			return (
				<Table.Body>
					<Table.Row onClick={this.toggleVisibility}>
      					<Table.Cell><h4>{this.props.collection.name}</h4></Table.Cell>
      					<Table.Cell textAlign="right">{this.props.collection.audio_set.length}</Table.Cell>
    				</Table.Row>
    				{this.state.isVisible&&audios}
				</Table.Body>
			)
		}

}

export default AudioList