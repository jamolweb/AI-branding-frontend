'use client';

import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';
import { brandbookService } from '@/services/brandbook';
import type { Brandbook } from '@/types/brandbook';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewBrandbookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [brandbook, setBrandbook] = useState<Brandbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function loadBrandbook() {
      if (!id) return;
      setLoading(true);
      setError(null);
      setPdfBlobUrl(null);
      setPdfError(null);

      try {
        const data = await brandbookService.get(id);
        setBrandbook(data);
      } catch (err) {
        console.error('Failed to load brandbook:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load brandbook data.',
        );
      } finally {
        setLoading(false);
      }
    }
    loadBrandbook();
  }, [id]);

  useEffect(() => {
    let currentObjectUrl: string | null = null;

    async function loadPdf() {
      if (!brandbook?.pdfUrl) {
        setLoadingPdf(false);
        return;
      }

      setLoadingPdf(true);
      setPdfError(null);
      setPdfBlobUrl(null);

      try {
        if (!authService.isAuthenticated()) {
          throw new Error('User is not authenticated.');
        }

        const response = await fetch(brandbook.pdfUrl, {
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('PDF Fetch Error:', response.status, errorText);
          throw new Error(
            `Failed to fetch PDF: ${response.status} ${response.statusText}`,
          );
        }

        const blob = await response.blob();

        if (blob.type !== 'application/pdf') {
          console.error('Fetched content is not PDF:', blob.type);
          throw new Error('Downloaded file is not a PDF.');
        }

        currentObjectUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(currentObjectUrl);
      } catch (err) {
        console.error('Failed to load PDF:', err);
        setPdfError(err instanceof Error ? err.message : 'Failed to load PDF.');
        if (currentObjectUrl) {
          URL.revokeObjectURL(currentObjectUrl);
          currentObjectUrl = null;
        }
      } finally {
        setLoadingPdf(false);
      }
    }

    if (brandbook) {
      loadPdf();
    }

    return () => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
        console.log('Revoked Object URL:', currentObjectUrl);
      }
    };
  }, [brandbook]);

  const handleDownloadPDF = () => {
    if (!pdfBlobUrl || !brandbook) return;

    setDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = pdfBlobUrl;
      link.download = `${brandbook.companyName}-brandbook.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !brandbook) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-black">
        <p className="text-destructive">{error || 'Brandbook not found.'}</p>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/brandbook')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Brandbooks
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-white"
            onClick={() => router.push('/dashboard/brandbook')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Brandbooks
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={downloading || loadingPdf || !pdfBlobUrl}
            className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {downloading ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          {brandbook.companyName}
        </h1>

        <div className="pdf-container aspect-[8.5/11] w-full max-w-4xl mx-auto border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          {loadingPdf && (
            <div className="flex items-center justify-center h-full bg-gray-900">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <p className="ml-3 text-gray-400">Loading PDF...</p>
            </div>
          )}
          {pdfError && (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4 text-center">
              <p className="text-destructive mb-2">Error loading PDF:</p>
              <p className="text-sm text-gray-400">{pdfError}</p>
              <p className="text-xs text-gray-500 mt-4">
                Check console for details. Ensure the PDF URL is correct and the
                server allows CORS.
              </p>
            </div>
          )}
          {pdfBlobUrl && !loadingPdf && !pdfError && (
            <iframe
              src={pdfBlobUrl}
              title={`${brandbook.companyName} Brandbook PDF`}
              className="w-full h-full"
              frameBorder="0"
            />
          )}
          {!pdfBlobUrl && !loadingPdf && !pdfError && (
            <div className="flex items-center justify-center h-full bg-gray-900">
              <p className="text-gray-500">No PDF available or specified.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
