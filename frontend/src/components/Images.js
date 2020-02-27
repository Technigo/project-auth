import React from 'react'
import style from 'styled-components'

const Ul = style.ul`
display: flex;
flex-direction: column;
justify-content: center;
aLign-items: center;
`

const Li = style.li`
padding-top: 20px;
list-style-type: none;
`

const Img = style.img`
width: 500px;
height: 500px;
`

const image = [
  { id: 1, src: './images/1.jpeg', title: 'selftought', alt: 'meme1' },
  { id: 2, src: './images/2.png', title: 'afraid', alt: 'meme2' },
  { id: 3, src: './images/3.jpg', title: 'looking-back', alt: 'meme3' },
  { id: 4, src: './images/4.png', title: 'elvish', alt: 'meme4' },
  { id: 5, src: './images/5.jpg', title: 'debugging', alt: 'meme5' },
  { id: 6, src: './images/6.png', title: 'ancient', alt: 'meme6' },
  { id: 7, src: './images/7.png', title: 'codemaster', alt: 'meme7' },
  { id: 8, src: './images/8.png', title: 'hybris', alt: 'meme8' },
  { id: 9, src: './images/9.png', title: 'computerLife', alt: 'meme9' },
  { id: 10, src: './images/10.png', title: 'classic', alt: 'meme10' } 
]

export const Images = () => {

return (
 <Ul>
   {image.map(image => (
     <Li key={image.id}>
     <Img src={image.src} alt={image.alt} />
     </Li>
   ))}
 </Ul>
)
}