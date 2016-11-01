$(function(){

  var stockPrice 

  // Collect closing stock price
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
      // console.log('this')
      stockPrice = parseInt(hashStock['l'])
      // console.log(hashStock)
      $('.stock-price').html(hashStock['l'])
    

    }).fail(function(){
      console.log('this failed')
    })
    setTimeout(stockPrice, 5000)
  }
  stockPrice();


  function option_stock(){
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

      // find 5 above and 5 bellow
      // stockPrice
      $('.puts-data').html('')
      // console.log(stockPrice)

      for(var i = 0, l = calls.length; i < l; i++){
        // console.log(calls[i])
        // console.log(puts[i])

        strike = parseInt(puts[i]['strike'])
        premium = parseInt(puts[i]['b'])
        // console.log(typeof(strike))
        // console.log(stockPrice + 20)
        if(  strike > stockPrice - 50 && strike < stockPrice + 50 ){

        // collect annual bid/strike

          annualBS = premium/strike

                
          $('<li>').html('Strike:'+ strike + ' Premium: ' + premium + 
            " Payout: " + Math.round((premium/strike + 0.00001) * 100) / 100 
            ).appendTo('.puts-data')
        }
      }




    }).fail(function(){
      console.log('this failed')
    })
    setTimeout(option_stock, 5000)
  }
  option_stock()


  $.ajax({
    url: 'http://chartapi.finance.yahoo.com/instrument/1.0/GOOG/chartdata;type=quote;range=1m/json',
    method: 'GET',
    data: {},
    dataType: 'jsonp',
    jsonp: "callback"
  }).done(function(data){
    console.log(data)


  }).fail(function(){
    console.log('ajax request for the RSI failed')
  })
});


// 'http://chartapi.finance.yahoo.com/instrument/1.0/'+ tickerSym +'/chartdata;type=quote;range=1y/csv'








