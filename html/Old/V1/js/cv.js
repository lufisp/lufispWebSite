/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    $(".headerMenulinks").hover(
            function(){
                $(this).css({
                    opacity: 0.5,
                    cursor: 'pointer'
                })                
            },function(){
                $(this).css({opacity: 1})                
            }
    )
    
    $("#cv_blogLink").click(function(){
        window.location.href='/blog';
        //window.location.href='http://www.lufisp.com/blog';
        //return false;        
    })
    
    $("#cv_mainPageLink").click(function(){
       window.location.href='../index.html';        
       return false;
    })
    
    $("#cv_pdfLink").click(function(e){
       e.preventDefault();
       window.location.href='../cv/CV_FR.pdf';        
       return false;
    })
    
})

