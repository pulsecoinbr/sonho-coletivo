# AI Rules for Sonho Coletivo

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom theme configuration
- **Build Tool**: Vite
- **State Management**: React Context API
- **UI Components**: Custom component library with shadcn/ui patterns
- **Icons**: Lucide React icons
- **AI Integration**: Google Gemini API
- **Storage**: localStorage for data persistence
- **Deployment**: Static hosting compatible with Vite builds

## Library Usage Rules

### Core Libraries
- **React**: For all UI components and state management
- **React Router**: For all client-side routing
- **Tailwind CSS**: For all styling needs - no vanilla CSS files
- **TypeScript**: For all component and utility files - strict typing required

### UI Components
- **Custom Components**: Create small, focused components in `src/components/`
- **Icons**: Use Lucide React icons for all iconography
- **Forms**: Use controlled components with proper validation
- **Responsive Design**: All components must be mobile-first and responsive

### State Management
- **Context API**: For global state management (user, campaigns, testimonials)
- **useState/useReducer**: For local component state
- **useCallback**: For performance optimization of functions passed to children
- **localStorage**: For data persistence between sessions

### External Integrations
- **Google Gemini**: For AI-powered text improvements
- **WhatsApp**: For customer support integration
- **Email**: For contact and reporting features

### Data Handling
- **TypeScript Interfaces**: Define all data structures in `types.ts`
- **Validation**: Validate all user inputs at the component level
- **Error Handling**: Use try/catch for async operations and API calls
- **Mock Data**: Use initial data arrays for development/testing

### File Structure Rules
- **Pages**: All route components in `src/pages/`
- **Components**: Reusable UI elements in `src/components/`
- **Context**: App-wide state in `context.ts`
- **Types**: All interfaces in `types.ts`
- **Utilities**: Helper functions in `utils/` (when needed)

### Code Quality
- **Component Size**: Keep components under 200 lines when possible
- **File Organization**: One main component per file
- **Props**: Define clear prop interfaces for all components
- **Accessibility**: All components must be accessible (ARIA labels, semantic HTML)
- **Performance**: Use React.memo for expensive components, useCallback for functions