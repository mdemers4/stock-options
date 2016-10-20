
$(function(){

  function stockPrice(){ 
    $.ajax({
      url: 'http://finance.google.com/finance/info?client=ig&q=NASDAQ:GOOG',
      method: 'GET',
      data: {},
      dataType: 'text'
    }).done(function(data){
      // console.log(data)
      var firstIndex = data.indexOf('{')
      var lastIndex = data.indexOf('}')
      stringHash = ''
      
      // console.log(firstIndex)
      // console.log(lastIndex)
      for(var i = firstIndex; i <= lastIndex; i ++ ){
        stringHash += data[i]

      }
      hashStock = eval('(' + stringHash + ')')

    
      $('.stock-price').html('')
      console.log('this')
      $('.stock-price').html(hashStock['l'])
    

    }).fail(function(){
      console.log('this failed')
    })
    setTimeout(stockPrice, 5000)
  }
  stockPrice();



  $.ajax({
    url: "https://www.google.com/finance/option_chain?q=NASDAQ:GOOG&expd=16&expm=12&expy=2016&output=json",
    method: 'GET',
    data: {},
    dataType: 'text'
  }).done(function(data){
    // console.log(data)

    var myJSONtext = data
    newData = eval('(' + myJSONtext + ')')

    // console.log(newData)
    calls = newData['calls']
    puts = newData['puts']



    for(var i = 0, l = calls.length; i < l; i++){
      // console.log(calls[i])
      // console.log(puts[i])
            
      $('<li>').html('Strike:' + calls[i]['strike'] + ' Price: '+ calls[i]['p'] + ' Bid: ' + calls[i]['b'] + " Bid/Strike: " + Math.round((calls[i]['b']/calls[i]['strike'] + 0.00001) * 100) / 100).appendTo('.calls-data')
      $('<li>').html('Strike:'+ puts[i]['strike'] + ' Price: ' + puts[i]['p'] + ' Bid: ' + puts[i]['b'] + " Bid/Strike: " + Math.round((puts[i]['b']/puts[i]['strike'] + 0.00001) * 100) / 100 ).appendTo('.puts-data')
    }




  }).fail(function(){
    console.log('this failed')
  })



});







