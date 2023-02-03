song = "";
song2 = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = "";
scoreRightWrist = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("righttWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("PoseNet is Initialized")
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");
    
    if(scoreLeftWrist > 0.5) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        if(!song2.isPlaying()) {
            song2.play();
            song1.stop();
        }
        song2.isPlaying();
        console.log("Peter Pan theme song is playing");
    }

    if(scoreRightWrist > 0.5) {
        circle(rightWristX, rightWristY, 20);
        InNumberRightWristY = Number(rightWristY);
        remove_decimals = floor(InNumberRightWristY);
        if(!song1.isPlaying()) {
            song1.play();
            song2.stop();
        }
        console.log("Harry Potter theme song is playing");

    }
}

function stop_song() {
    song1.stop();
    song2.stop();
}