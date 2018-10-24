using Microsoft.JSInterop;
using System;

namespace BlazorJsInterop.Helpers
{
    public static class TempHelper
    {
        [JSInvokable()]
        public static string GetColor(int temperature)
        {
            Console.WriteLine($"Getting color for temperature {temperature}");

            if (temperature > 0)
            {
                return "black";
            }
            if (temperature > -5){
                return "#7F0000";
            }
            if (temperature > -10){
                return "#AF0000";
            }
            if (temperature > -15){
                return "#DF0000";
            }
            return "#FF0000";
        }
    }
}