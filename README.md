# LCLS Maintenance Dashboard

A comprehensive maintenance analytics dashboard for the Linac Coherent Light Source (LCLS) facility, built with React and Chart.js. This dashboard provides real-time insights into preventive maintenance operations, equipment performance, and technician productivity.

## Features

### Overview Analytics
- **Key Metrics**: Total tasks, on-time completion rate, scheduled maintenance percentage, and total downtime
- **Visual Summary**: Bar charts showing performance indicators
- **Automated Analysis**: AI-powered suggestions for maintenance optimization

### Equipment Tracking
- Maintenance frequency by equipment type
- On-time performance metrics per equipment
- Downtime impact analysis
- Interactive charts for equipment comparison

### Technician Performance
- Workload distribution across team members
- Individual performance metrics
- On-time completion rates
- Detailed performance summary tables

### Task Analysis
- Task type frequency distribution
- Average downtime by task category
- Comprehensive task statistics
- Identification of high-impact maintenance activities

### Trend Analysis
- Monthly task volume trends
- On-time rate progression over time
- Downtime trends across quarters
- Historical performance tracking

### AI-Powered Insights
- Natural language query interface
- Automated data analysis
- Pattern recognition
- Predictive maintenance suggestions

## Technology Stack

- **React 18**: UI framework for interactive components
- **Chart.js 4.4.0**: Data visualization library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: No build tools required - runs directly in the browser

## Getting Started

### Prerequisites

No installation required! This is a standalone HTML file that runs entirely in the browser.

### Running the Dashboard

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. The dashboard will load with Q1 2024 sample data

```bash
# Using a local server (optional but recommended)
python -m http.server 8000
# Then open http://localhost:8000
```

### Browser Compatibility

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

## Data Structure

The dashboard uses CSV-formatted maintenance data with the following fields:

- **Date**: Task completion date (YYYY-MM-DD)
- **Equipment**: Equipment identifier
- **Task Performed**: Type of maintenance task
- **Technician**: Assigned technician
- **Scheduled**: Whether task was scheduled (Y/N)
- **Completed On Time**: On-time completion status (Y/N)
- **Downtime Impact**: Hours of downtime caused by maintenance

## Customization

### Adding Your Own Data

Replace the embedded CSV data in [index.html:25-145](index.html#L25-L145) with your facility's maintenance records:

```javascript
const csvData = `Date,Equipment,Task Performed,Technician,Scheduled,Completed On Time,Downtime Impact (hrs)
2024-03-22,Vacuum Chamber,Sensor Inspection,J. Lin,N,Y,0.0
// Add your data here...
`;
```

### Styling

The dashboard uses Tailwind CSS. Modify classes in the React components to customize the appearance:

- Color schemes: Update `bg-*`, `text-*` classes
- Layout: Adjust `grid-cols-*`, `gap-*` classes
- Charts: Modify Chart.js configuration in chart creation functions

### Adding New Tabs

Add new analysis tabs by:

1. Adding a tab button to the navigation array at [index.html:563](index.html#L563)
2. Creating a corresponding section with your custom content
3. Adding a chart rendering function if needed

## Key Metrics Explained

- **On-Time Completion Rate**: Percentage of tasks completed within scheduled timeframe
- **Scheduled Rate**: Percentage of planned vs. reactive maintenance
- **Downtime Impact**: Total hours of equipment unavailability
- **Average Downtime**: Mean downtime per maintenance incident

## AI Integration

The AI tab includes a placeholder for AI-powered analysis. To enable full AI functionality:

1. Integrate with your preferred AI service (OpenAI, Anthropic, etc.)
2. Update the `askAI()` function at [index.html:460-465](index.html#L460-L465)
3. Add your API key and endpoint configuration
4. Implement secure API calls

## Performance Considerations

- All data processing happens client-side
- Chart instances are properly destroyed on tab changes to prevent memory leaks
- Optimized for datasets up to 1000+ maintenance records
- For larger datasets, consider implementing pagination or server-side processing

## Project Structure

```
maintenance/
├── index.html                    # Main dashboard file (standalone)
├── maintenance-dashboard.jsx     # Source JSX (for reference)
├── README.md                     # This file
└── .claude/                      # Configuration directory
```

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different browsers
5. Submit a pull request

## License

This project is provided as-is for maintenance analytics purposes.

## Support

For questions or issues:
- Review the inline code documentation
- Check browser console for error messages
- Ensure data format matches the expected CSV structure

## Future Enhancements

Potential improvements:
- Export functionality (PDF, Excel)
- Real-time data integration
- Mobile-responsive optimizations
- Advanced filtering options
- Custom date range selection
- Multi-facility support
- Integration with CMMS systems

## Acknowledgments

Built for LCLS (Linac Coherent Light Source) facility maintenance operations.

---

**Last Updated**: November 2024
**Version**: 1.0.0
