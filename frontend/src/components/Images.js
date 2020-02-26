import React from 'react'

export const Images = () => {

const image = [
  {id: 1, src: '../images/1.jpeg', title: 'selftought', description: 'meme1' },
  {id: 2, src: '../images/2.png', title: 'afraid', description: 'meme2' },
  {id: 3, src: '../images/3.jpg', title: 'looking-back', description: 'meme3' },
  {id: 4, src: '../images/4.png', title: 'elvish', description: 'meme4' },
  {id: 5, src: '../images/5.jpg', title: 'debugging', description: 'meme5' },
  {id: 6, src: '../images/6.png', title: 'ancient', description: 'meme6' },
  {id: 7, src: '../images/7.png', title: 'codemaster', description: 'meme7' },
  {id: 8, src: '../images/8.png', title: 'hybris', description: 'meme8' },
  {id: 9, src: '../images/9.png', title: 'computerlife', description: 'meme9' },
  {id: 10, src: '../images/10.png', title: 'classic', description: 'meme10' },
]

return (
 <ul>
   <li>
   {image.map(image => (
     <img key={image.id} to={image.src} />
   ))}
   </li>
 </ul>
)
}