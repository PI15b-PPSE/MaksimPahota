var createPassword = function() {
  var passAt = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var passArray = Array.from({length: 15})

  return passArray.map(function(_, index) { 
    return index % 4 == 3 ? '-' : passAt.charAt(Math.random() * passAt.length)
  }).join('')
}