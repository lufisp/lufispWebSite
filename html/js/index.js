/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    $(".links").hover(
            function(){
                $(this).css({
                    opacity: 0.5,
                    cursor: 'pointer'
                })                
            },function(){
                $(this).css({opacity: 1})                
            }
    )
    
    $("#blog").click(function(){
        window.location.href='/blog';
        //window.location.href='http://www.lufisp.com/blog';
        //return false;        
    })
    
    $("#cv").click(function(){
       window.location.href='cv/cv.html';        
    })
    
})

