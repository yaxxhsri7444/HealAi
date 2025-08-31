import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat';
import { CommonModule } from '@angular/common';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  moodsCount = { happy: 0, sad: 0, neutral: 0 };
  chats: any[] = [];

  // Chart config
  moodChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  moodChartLabels: string[] = ['Happy', 'Sad', 'Neutral'];
  moodChartData: ChartData<'doughnut'> = {
    labels: this.moodChartLabels,
    datasets: [
      { data: [0, 0, 0], backgroundColor: ['#34d399', '#f87171', '#9ca3af'] }
    ]
  };
  moodChartType: ChartType = 'doughnut';

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    this.loadMoodStats();
    this.loadChats();
  }

  loadMoodStats() {
    this.chat.getMoodSummary().subscribe(
      (res) => {
        this.moodsCount = res;
        this.moodChartData.datasets[0].data = [
          res.happy,
          res.sad,
          res.neutral
        ];
      }
    );
  }

  loadChats() {
    this.chat.getChats().subscribe(
      (res) => {
        this.chats = Array.isArray(res) ? res : Object.values(res);
      }
    );
  }
}
