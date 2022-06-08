const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAffirmation)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteAffirmation(){
    const affirmation = this.parentNode.childNodes[3].innerText
    console.log('affirmation is ', affirmation)
    try{
        const response = await fetch('/api/affirmation/'+affirmation, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'}
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

/*  Will deal with this later
async function addLike(){
    const affirmation = this.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[4].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'content': affirmation,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
*/