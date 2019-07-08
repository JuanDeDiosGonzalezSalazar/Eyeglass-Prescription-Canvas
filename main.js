window.addEventListener('load', () => {
    let canvasElement = document.querySelector('#canvas')
    let context = canvasElement.getContext('2d')
    
    context.font = '30px sans-serif'

    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    let protractorRadius;
    let protractorHeightCentering;
    let divisionLength;

    if (canvas.width < canvas.height) {
        protractorRadius = canvas.width * 0.25
    } else {
        protractorRadius = canvas.height * 0.75
    }
    protractorHeightCentering = (canvas.height + protractorRadius) * 0.5;
    
    console.log('Canvas Heigth:', canvas.height)
    console.log('Protractor Initial Radius:', protractorRadius)
    console.log('Protractor Horizontal Center:', canvas.width * 0.5)
    
    window.addEventListener('resize', () => {
        canvas.height = canvas.clientHeight
        canvas.width = canvas.clientWidth
    })


    let degrees = []
    for(let degree = 0; degree <= Math.PI; degree+=(Math.PI/180)){
        degrees.push(
            {
                x: Math.cos(degree),
                y: Math.sin(degree)
            }
        )
    }

    console.log(degrees)

    function drawProtractor() {
        // Calculate the radius of the protractor depending on the aspect ratio
        // We do it at every frame thinking it can change at any time

        if (canvas.width < canvas.height) {
            protractorRadius = canvas.width * 0.25
        } else {
            protractorRadius = canvas.height * 0.75
        }
        protractorHeightCentering = (canvas.height + protractorRadius + 32) * 0.5;
        
        // console.log('Canvas width: ', canvas.width, ' Canvas height:', canvas.height, 'Protractor Radius: ', protractorRadius)

        context.beginPath()
        
        // Draw arc
        context.arc(canvas.width * 0.5, protractorHeightCentering, protractorRadius, Math.PI, 0, false)

        // Draw divisions
        degrees.forEach((degree, index) => {
            if(index % 10 == 0){
                divisionLength = 32
                context.fillText(`${index}`, canvas.width * 0.5 + (degree.x * protractorRadius + degree.x * divisionLength * 1.1), (protractorHeightCentering - (degree.y * protractorRadius + degree.y * divisionLength * 1.1)))
            }else if(index % 5 == 0){
                divisionLength = 24
            }else{
                divisionLength = 16
            }

            context.moveTo(canvas.width * 0.5 + (degree.x * protractorRadius), (protractorHeightCentering - (degree.y * protractorRadius)))
            context.lineTo(canvas.width * 0.5 + (degree.x * protractorRadius + degree.x * divisionLength), (protractorHeightCentering - (degree.y * protractorRadius + degree.y * divisionLength)))
        })

        // context.lineTo(50, 50)
        // context.moveTo(50, 80)
        // context.lineTo(50, 80)

        context.stroke()
    }

    function update() {
        clearCanvas()

        drawProtractor()

        requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
})