using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class LogoGen {
    public static void Main(string[] args) {
        int w = 900;
        int h = 750;
        using (Bitmap bmp = new Bitmap(w, h)) {
            using (Graphics g = Graphics.FromImage(bmp)) {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
                
                // Dark background
                using (SolidBrush bgBrush = new SolidBrush(Color.FromArgb(10, 14, 23))) {
                    g.FillRectangle(bgBrush, 0, 0, w, h);
                }
                
                // Gold Border
                using (Pen borderPen = new Pen(Color.FromArgb(212, 175, 55), 6)) {
                    g.DrawRectangle(borderPen, 15, 15, w - 30, h - 30);
                }

                // Monogram AG
                using (Font fontAG = new Font("Arial", 250, FontStyle.Bold)) {
                    using (SolidBrush brushA = new SolidBrush(Color.FromArgb(50, 235, 235, 235))) {
                        g.DrawString("A", fontAG, brushA, new PointF(200, 40));
                    }
                    using (SolidBrush brushG = new SolidBrush(Color.FromArgb(70, 255, 255, 255))) {
                        g.DrawString("G", fontAG, brushG, new PointF(410, 40));
                    }
                }

                // Gold Divider Line
                using (Pen linePen = new Pen(Color.FromArgb(229, 193, 88), 4)) {
                    g.DrawLine(linePen, 180, 480, 720, 480);
                }

                // AMOUR GOVOETCHAN text
                using (Font fontName = new Font("Arial", 36, FontStyle.Bold)) {
                    using (SolidBrush goldBrush = new SolidBrush(Color.FromArgb(229, 193, 88))) {
                        SizeF sz = g.MeasureString("AMOUR GOVOETCHAN", fontName);
                        g.DrawString("AMOUR GOVOETCHAN", fontName, goldBrush, (w - sz.Width) / 2, 520);
                    }
                }

                // Subtitle
                using (Font fontSub = new Font("Arial", 22, FontStyle.Regular)) {
                    using (SolidBrush subBrush = new SolidBrush(Color.FromArgb(148, 163, 184))) {
                        SizeF sz = g.MeasureString("DÉVELOPPEUR | DESIGNER | IA", fontSub);
                        g.DrawString("DÉVELOPPEUR | DESIGNER | IA", fontSub, subBrush, (w - sz.Width) / 2, 600);
                    }
                }
            }
            string pathJpg = args[0];
            string pathPng = args[1];
            bmp.Save(pathJpg, ImageFormat.Jpeg);
            bmp.Save(pathPng, ImageFormat.Png);
        }
    }
}
