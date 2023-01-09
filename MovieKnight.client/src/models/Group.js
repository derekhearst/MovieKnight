


export class Group{
  constructor(data){
    this.title = data.title
    this.description = data.description
    this.creatorId = data.creatorId
    this.coverImg = data.coverImg
    this.visibility = data.visibility
    this.archived = data.archived
  }
}