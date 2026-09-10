// Animation Controller
class HeistAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        this.currentTime = 0;
        this.duration = 300; // 5 minutes in seconds
        this.isPlaying = false;
        this.frameId = null;
        this.lastFrameTime = 0;
        
        this.setupEventListeners();
        this.initializeScenes();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    setupEventListeners() {
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('progressBar').addEventListener('input', (e) => {
            this.currentTime = parseFloat(e.target.value);
            this.render();
        });

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.render();
        });
    }

    initializeScenes() {
        this.scenes = [
            { start: 0, end: 30, render: (progress) => this.renderScene1(progress) },
            { start: 30, end: 75, render: (progress) => this.renderScene2(progress) },
            { start: 75, end: 120, render: (progress) => this.renderScene3(progress) },
            { start: 120, end: 195, render: (progress) => this.renderScene4(progress) },
            { start: 195, end: 255, render: (progress) => this.renderScene5(progress) },
            { start: 255, end: 285, render: (progress) => this.renderScene6(progress) },
            { start: 285, end: 300, render: (progress) => this.renderScene7(progress) }
        ];

        this.narration = [
            { start: 0, end: 30, text: "Antwerp, Belgium. For centuries, it has been known as the diamond capital of the world. Seventy percent of the world's diamonds pass through this city's vaults and exchanges. But on February 15, 2003, something extraordinary happened—something that would become one of the greatest heists in modern history." },
            { start: 30, end: 75, text: "Deep beneath the Antwerp Diamond Center lies a vault. Not just any vault—one of the most secure locations on Earth. It was protected by ten layers of defense: A reinforced concrete structure. A locked outer door. Motion sensors. A laser alarm system. Pressure sensors. Thermal imaging. Access codes. Electronic locks. Backup systems. And one final layer—a time-lock mechanism." },
            { start: 75, end: 120, text: "Enter Leonardo Notarbartolo. A career jewel thief with a reputation for meticulous planning. He studied the vault for months. He gathered intelligence. He watched the guards. He mapped every camera angle. But Notarbartolo knew one man couldn't do this. He assembled a team—specialists in different crafts." },
            { start: 120, end: 195, text: "The heist wasn't about force. It was about finesse. About patience. About understanding systems so completely that you could exploit the smallest vulnerability. They obtained maintenance uniforms and security passes. They disabled cameras—but not all of them. They used mirrors to redirect laser alarms. They understood the blind spots. And then—the final barrier. The time-lock. They simply turned it off." },
            { start: 195, end: 255, text: "On February 15, 2003, the team moved. They were inside for just hours. They moved with surgical precision. No alarms. No violence. No confrontation. They stole approximately 160 million euros worth of diamonds. One hundred and forty-seven diamond parcels. They left no fingerprints. They left no DNA. Only questions." },
            { start: 255, end: 285, text: "The heist shocked the world. Insurance companies were stunned. Security experts were baffled. But one mistake—a small mistake—led to Notarbartolo's capture. He was arrested in Italy three months later. Most of the diamonds were recovered. But the heist remains legendary." },
            { start: 285, end: 300, text: "The Antwerp Diamond Heist reminds us of a profound truth: there is no such thing as impenetrable security. Only security with yet-undiscovered vulnerabilities. It was, without question, one of the greatest heists ever pulled off." }
        ];
    }

    updateNarration() {
        const currentNarration = this.narration.find(
            n => this.currentTime >= n.start && this.currentTime < n.end
        );
        
        if (currentNarration) {
            document.getElementById('narrator-text').textContent = currentNarration.text;
        }
    }

    // Scene 1: Antwerp City
    renderScene1(progress) {
        this.fillBackground('#0f3460');
        
        // Animated city skyline with diamonds
        this.drawSkyline(progress);
        this.drawDiamonds(progress);
        this.drawTitle("ANTWERP, BELGIUM", progress);
    }

    // Scene 2: The Vault
    renderScene2(progress) {
        this.fillBackground('#1a1a2e');
        this.drawVault(progress);
        this.drawSecurityLayers(progress);
    }

    // Scene 3: The Mastermind
    renderScene3(progress) {
        this.fillBackground('#0f3460');
        this.drawMastermind(progress);
        this.drawTeamMembers(progress);
    }

    // Scene 4: The Plan
    renderScene4(progress) {
        this.fillBackground('#1a1a2e');
        this.drawPlan(progress);
        this.drawSecurityBypass(progress);
    }

    // Scene 5: The Heist
    renderScene5(progress) {
        this.fillBackground('#0f3460');
        this.drawHeistInProgress(progress);
        this.drawDiamondCollection(progress);
    }

    // Scene 6: Aftermath
    renderScene6(progress) {
        this.fillBackground('#1a1a2e');
        this.drawArrest(progress);
        this.drawInvestigation(progress);
    }

    // Scene 7: The Lesson
    renderScene7(progress) {
        this.fillBackground('#0f3460');
        this.drawConclusion(progress);
    }

    // Drawing helper methods
    fillBackground(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSkyline(progress) {
        const startX = this.canvas.width * 0.1;
        const startY = this.canvas.height * 0.5;
        const buildingWidth = 50;
        const buildingSpacing = 60;

        this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.3 + progress * 0.3) + ')';
        
        for (let i = 0; i < 10; i++) {
            const x = startX + i * buildingSpacing;
            const baseHeight = 80 + Math.sin(i) * 40;
            const animatedHeight = baseHeight * (0.5 + progress * 0.5);
            
            this.ctx.fillRect(x, startY - animatedHeight, buildingWidth, animatedHeight);
            
            // Windows
            this.ctx.fillStyle = 'rgba(255, 223, 0, ' + (0.5 + progress * 0.5) + ')';
            for (let j = 0; j < Math.floor(animatedHeight / 15); j++) {
                this.ctx.fillRect(x + 5, startY - animatedHeight + j * 15 + 5, 8, 8);
                this.ctx.fillRect(x + 20, startY - animatedHeight + j * 15 + 5, 8, 8);
                this.ctx.fillRect(x + 35, startY - animatedHeight + j * 15 + 5, 8, 8);
            }
            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.3 + progress * 0.3) + ')';
        }
    }

    drawDiamonds(progress) {
        const diamondCount = 15;
        const waveProgress = (progress + this.currentTime) % 1;
        
        for (let i = 0; i < diamondCount; i++) {
            const angle = (i / diamondCount) * Math.PI * 2 + waveProgress * Math.PI * 2;
            const x = this.canvas.width / 2 + Math.cos(angle) * 150;
            const y = this.canvas.height / 2 + Math.sin(angle) * 100;
            const size = 8 + Math.sin(angle) * 3;
            
            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.5 + Math.sin(angle) * 0.3) + ')';
            this.drawDiamond(x, y, size);
        }
    }

    drawDiamond(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x + size, y);
        this.ctx.lineTo(x, y + size);
        this.ctx.lineTo(x - size, y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawTitle(text, progress) {
        this.ctx.font = 'bold ' + (40 + progress * 20) + 'px Arial';
        this.ctx.fillStyle = 'rgba(212, 175, 55, ' + progress + ')';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        this.ctx.shadowBlur = 20;
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height * 0.8);
        this.ctx.shadowColor = 'transparent';
    }

    drawVault(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const baseSize = 100;
        const size = baseSize * (0.5 + progress * 0.5);

        // Outer vault door
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);

        // Vault door edge
        this.ctx.strokeStyle = '#666666';
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(centerX - size, centerY - size, size * 2, size * 2);

        // Vault combination wheel
        this.ctx.fillStyle = '#888888';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size * 0.4, 0, Math.PI * 2);
        this.ctx.fill();

        // Numbers on wheel
        this.ctx.fillStyle = '#d4af37';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * size * 0.35;
            const y = centerY + Math.sin(angle) * size * 0.35;
            this.ctx.fillText((i || 12).toString(), x, y);
        }

        // Title
        this.ctx.font = 'bold 28px Arial';
        this.ctx.fillText("THE IMPENETRABLE VAULT", centerX, centerY - size - 40);
    }

    drawSecurityLayers(progress) {
        const centerX = this.canvas.width / 2;
        const startY = this.canvas.height * 0.15;
        const layerHeight = 25;
        const layerWidth = 600;

        const layers = [
            "1. REINFORCED CONCRETE",
            "2. LOCKED OUTER DOOR",
            "3. MOTION SENSORS",
            "4. LASER ALARM SYSTEM",
            "5. PRESSURE SENSORS",
            "6. THERMAL IMAGING",
            "7. ACCESS CODES",
            "8. ELECTRONIC LOCKS",
            "9. BACKUP SYSTEMS",
            "10. TIME-LOCK MECHANISM"
        ];

        layers.forEach((layer, index) => {
            const y = startY + index * (layerHeight + 5);
            const animationDelay = index * 0.03;
            const layerProgress = Math.max(0, Math.min(1, progress - animationDelay));

            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.2 + layerProgress * 0.3) + ')';
            this.ctx.fillRect(centerX - layerWidth / 2, y, layerWidth * layerProgress, layerHeight);

            this.ctx.strokeStyle = '#d4af37';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(centerX - layerWidth / 2, y, layerWidth, layerHeight);

            this.ctx.font = '12px Arial';
            this.ctx.fillStyle = '#d4af37';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(layer, centerX - layerWidth / 2 + 10, y + 16);
        });
    }

    drawMastermind(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Silhouette
        this.ctx.fillStyle = 'rgba(20, 20, 20, ' + (0.5 + progress * 0.3) + ')';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - 50, 30, 0, Math.PI * 2);
        this.ctx.fill();

        // Body
        this.ctx.fillRect(centerX - 25, centerY - 20, 50, 70);

        // Title and info
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillStyle = '#d4af37';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("LEONARDO NOTARBARTOLO", centerX, centerY + 100);

        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.5 + progress * 0.3) + ')';
        this.ctx.fillText("Career Jewel Thief | Master Planner", centerX, centerY + 130);
    }

    drawTeamMembers(progress) {
        const members = ["Locksmith", "Surveillance Expert", "Electrician", "Technician"];
        const startX = this.canvas.width * 0.15;
        const spacing = this.canvas.width * 0.2;

        members.forEach((member, index) => {
            const x = startX + index * spacing;
            const animationDelay = index * 0.1;
            const memberProgress = Math.max(0, Math.min(1, progress - animationDelay));

            // Head
            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + memberProgress + ')';
            this.ctx.beginPath();
            this.ctx.arc(x, this.canvas.height / 2 - 80, 20 * memberProgress, 0, Math.PI * 2);
            this.ctx.fill();

            // Body
            this.ctx.fillRect(x - 15 * memberProgress, this.canvas.height / 2 - 60, 30 * memberProgress, 50);

            // Name
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(member, x, this.canvas.height / 2 + 30);
        });
    }

    drawPlan(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Blueprint background
        this.ctx.fillStyle = '#1a3a52';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        this.ctx.strokeStyle = 'rgba(0, 150, 200, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.canvas.width; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i < this.canvas.height; i += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }

        // Plan steps
        const steps = [
            "STEP 1: OBTAIN ACCESS",
            "STEP 2: DISABLE CAMERAS",
            "STEP 3: BYPASS LASERS",
            "STEP 4: DISABLE POWER"
        ];

        steps.forEach((step, index) => {
            const y = centerY - 100 + index * 50;
            const stepProgress = Math.max(0, Math.min(1, progress - index * 0.1));

            this.ctx.strokeStyle = '#d4af37';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(centerX - 150, y, 300 * stepProgress, 40);

            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = '#d4af37';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(step, centerX, y + 25);
        });
    }

    drawSecurityBypass(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Draw laser with bypass
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 200, centerY);
        this.ctx.lineTo(centerX + 200, centerY);
        this.ctx.stroke();

        // Mirror bypass
        this.ctx.strokeStyle = '#d4af37';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 100, centerY - 50);
        this.ctx.lineTo(centerX, centerY + 50);
        this.ctx.stroke();

        this.ctx.fillStyle = '#d4af37';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("LASER REDIRECTION", centerX, centerY - 100);
    }

    drawHeistInProgress(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Vault opening animation
        const openProgress = progress;
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(centerX - 150, centerY - 100, 300, 200);

        // Door swing
        this.ctx.fillStyle = '#666666';
        this.ctx.save();
        this.ctx.translate(centerX - 150, centerY - 100);
        this.ctx.rotate(openProgress * Math.PI / 2);
        this.ctx.fillRect(0, 0, 150, 200);
        this.ctx.restore();

        // Title
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#d4af37';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("FEBRUARY 15, 2003", centerX, centerY - 150);
        this.ctx.fillText("THE VAULT OPENS", centerX, centerY + 150);
    }

    drawDiamondCollection(progress) {
        const diamondCount = 20;
        
        for (let i = 0; i < diamondCount; i++) {
            const startX = this.canvas.width / 2 - 100 + (i % 10) * 20;
            const startY = this.canvas.height / 2 - 50 + Math.floor(i / 10) * 20;
            const endX = this.canvas.width / 2 + 150;
            const endY = this.canvas.height / 2;

            const x = startX + (endX - startX) * progress;
            const y = startY + (endY - startY) * progress;

            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (1 - progress * 0.5) + ')';
            this.drawDiamond(x, y, 6);
        }

        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillStyle = '#d4af37';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("160 MILLION EUROS STOLEN", this.canvas.width / 2, this.canvas.height * 0.1);
    }

    drawArrest(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Police car
        this.ctx.fillStyle = '#0066cc';
        this.ctx.fillRect(centerX - 100, centerY, 200, 60);

        // Lights
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(centerX - 80, centerY - 20, 20, 20);
        this.ctx.fillStyle = '#0000ff';
        this.ctx.fillRect(centerX + 60, centerY - 20, 20, 20);

        // Title
        this.ctx.font = 'bold 28px Arial';
        this.ctx.fillStyle = '#d4af37';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("ARRESTED IN ITALY", centerX, centerY - 100);
        this.ctx.font = '18px Arial';
        this.ctx.fillText("THREE MONTHS LATER", centerX, centerY + 150);
    }

    drawInvestigation(progress) {
        const centerX = this.canvas.width / 2;
        const startY = this.canvas.height * 0.2;

        const evidence = ["Evidence", "Clues", "Arrests", "Recovery"];
        
        evidence.forEach((item, index) => {
            const y = startY + index * 60;
            const itemProgress = Math.max(0, Math.min(1, progress - index * 0.15));

            this.ctx.fillStyle = 'rgba(212, 175, 55, ' + itemProgress + ')';
            this.ctx.beginPath();
            this.ctx.arc(centerX, y, 30 * itemProgress, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(item, centerX, y + 5);
        });
    }

    drawConclusion(progress) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillStyle = 'rgba(212, 175, 55, ' + progress + ')';
        this.ctx.textAlign = 'center';

        const conclusion = "ONE OF THE GREATEST HEISTS EVER PULLED OFF";
        this.ctx.fillText(conclusion, centerX, centerY);

        this.ctx.font = 'italic 18px Arial';
        this.ctx.fillStyle = 'rgba(212, 175, 55, ' + (progress * 0.7) + ')';
        this.ctx.fillText("No such thing as impenetrable security exists.", centerX, centerY + 80);
    }

    render() {
        const currentScene = this.scenes.find(
            s => this.currentTime >= s.start && this.currentTime < s.end
        );

        if (currentScene) {
            const sceneProgress = (this.currentTime - currentScene.start) / (currentScene.end - currentScene.start);
            currentScene.render(sceneProgress);
        }

        this.updateNarration();
        this.updateTimer();
    }

    animate() {
        const now = performance.now();
        const deltaTime = (now - this.lastFrameTime) / 1000;
        this.lastFrameTime = now;

        if (this.isPlaying) {
            this.currentTime = Math.min(this.currentTime + deltaTime, this.duration);
            
            if (this.currentTime >= this.duration) {
                this.pause();
            }
        }

        this.render();
        document.getElementById('progressBar').value = this.currentTime;
        
        this.frameId = requestAnimationFrame(() => this.animate());
    }

    play() {
        this.isPlaying = true;
        this.lastFrameTime = performance.now();
    }

    pause() {
        this.isPlaying = false;
    }

    updateTimer() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = Math.floor(this.currentTime % 60);
        const totalMinutes = Math.floor(this.duration / 60);
        const totalSeconds = Math.floor(this.duration % 60);
        
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = timeStr;
    }

    start() {
        this.animate();
    }
}

// Initialize animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const animation = new HeistAnimation('animationCanvas');
    animation.start();
});
