(function() {
  $(function() {
    var $beer, createBubbles, defaults;
    defaults = {
      MAX_BUBBLE_SIZE: 100,
      MAX_BLUR: 10,
      MAX_ANIMATION_DURATION: 8000
    };
    $beer = $(".beer");
    createBubbles = function(bubbleCount) {
      var $bubble,
        bubbleBlur,
        bubbleDelay,
        bubbleOpacity,
        bubbleScale,
        bubbleSize,
        bubbleSpeed,
        xPos,
        yPos,
        _i,
        _results;
      _results = [];
      for (
        _i = 0;
        0 <= bubbleCount ? _i < bubbleCount : _i > bubbleCount;
        0 <= bubbleCount ? _i++ : _i--
      ) {
        xPos = Math.floor(Math.random() * 100 + 1);
        yPos = Math.floor(Math.random() * 25 + 1);
        bubbleSize = Math.floor(Math.random() * defaults.MAX_BUBBLE_SIZE + 1);
        bubbleDelay = Math.floor(Math.random() * 100 * bubbleCount + 1);
        bubbleScale = bubbleSize / defaults.MAX_BUBBLE_SIZE;
        bubbleBlur = bubbleScale * defaults.MAX_BLUR;
        bubbleSpeed = (1 - bubbleScale * bubbleScale) * defaults.MAX_ANIMATION_DURATION;
        bubbleOpacity = 0.25 * (1 - bubbleScale);
        $bubble = $("<div>")
          .addClass("hubble")
          .css({
            width: bubbleSize + "px",
            height: bubbleSize + "px",
            left: xPos + "%",
            top: yPos + "%",
            "-webkit-animation-delay": bubbleDelay + "ms",
            "-webkit-animation-duration": bubbleSpeed + "ms",
            "-webkit-filter": "blur(" + bubbleBlur + "px)",
            filter: "blur(" + bubbleBlur + "px)",
            opacity: bubbleOpacity
          });

        _results.push($beer.append($bubble));
      }
      return _results;
    };
    return createBubbles(100);
  });
}.call(this));
